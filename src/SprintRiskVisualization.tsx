import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import _ from 'lodash';

const SprintRiskDashboard = () => {
  const [sprintRisks, setSprintRisks] = useState({});
  const [insightsBySprint, setInsightsBySprint] = useState({});
  const [selectedSprint, setSelectedSprint] = useState('Sprint 49');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load Sprint Risk Data
        const sprintRiskResponse = await window.fs.readFile('Sprint risk.csv');
        const sprintRiskText = new TextDecoder().decode(sprintRiskResponse);
        
        // Load Insights Risk Data
        const insightsRiskResponse = await window.fs.readFile('Insights risk.csv');
        const insightsRiskText = new TextDecoder().decode(insightsRiskResponse);
        
        // Parse both files
        const parsedSprintRisk = Papa.parse(sprintRiskText, {
          header: false,
          skipEmptyLines: true,
          dynamicTyping: true
        });

        // Process Sprint Risk data
        const sprints = {};
        const dayIndices = [];
        
        // Extract day indices from row 1
        for (let i = 3; i < parsedSprintRisk.data[1].length; i++) {
          if (parsedSprintRisk.data[1][i] !== null) {
            dayIndices.push({
              index: i,
              day: parsedSprintRisk.data[1][i]
            });
          }
        }
        
        // Extract sprint data
        for (let i = 2; i < parsedSprintRisk.data.length; i++) {
          const row = parsedSprintRisk.data[i];
          if (row[0] && row[0].toString().includes('Sprint')) {
            const sprintName = row[0];
            const riskByDay = {};
            const chartData = [];
            
            dayIndices.forEach(dayInfo => {
              const dayLabel = `Day ${dayInfo.day}`;
              riskByDay[dayLabel] = row[dayInfo.index];
              
              chartData.push({
                day: dayLabel,
                risk: row[dayInfo.index] || 0
              });
            });
            
            sprints[sprintName] = {
              startDate: row[2], // Switch end date to start date
              endDate: row[1],   // Switch start date to end date
              riskByDay,
              chartData
            };
          }
        }
        
        // Process Insights Risk data more carefully, splitting by lines
        const insights = {};
        const lines = insightsRiskText.split('\n');
        let currentSprint = null;
        let headers = null;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          // Skip empty lines
          if (!line) continue;
          
          // Parse the current line
          const rowData = Papa.parse(line).data[0];
          
          // Check if this is a sprint header line
          if (rowData[0] && rowData[0].includes('Sprint') && 
              rowData.slice(1).every(cell => !cell || cell.trim() === '')) {
            currentSprint = rowData[0].trim();
            insights[currentSprint] = [];
            continue;
          }
          
          // Check if this is the headers line
          if (rowData[0] === 'Insight') {
            headers = rowData;
            continue;
          }
          
          // Process insight rows - INCLUDING the Sprint Burndown row
          if (currentSprint && headers && rowData[0] && rowData[0].trim().length > 5) {
            const insight = {
              name: rowData[0].trim(),
              impact: rowData[1] ? rowData[1].trim() : '',
              weight: rowData[2] ? parseInt(rowData[2]) : 0
            };
            
            // Add risk values by day
            const riskByDay = {};
            const chartData = [];
            
            for (let j = 3; j < Math.min(rowData.length, headers.length); j++) {
              if (headers[j] && headers[j].includes('Day')) {
                const dayLabel = headers[j].trim();
                const riskValue = rowData[j] ? parseFloat(rowData[j]) : 0;
                
                riskByDay[dayLabel] = riskValue;
                chartData.push({
                  day: dayLabel,
                  risk: riskValue
                });
              }
            }
            
            insight.riskByDay = riskByDay;
            insight.chartData = chartData;
            
            insights[currentSprint].push(insight);
          }
        }
        
        setSprintRisks(sprints);
        setInsightsBySprint(insights);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please check console for details.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format data for stacked bar chart
  const getStackedBarData = () => {
    if (!selectedSprint || !insightsBySprint[selectedSprint]) return [];
    
    const insightData = insightsBySprint[selectedSprint];
    const dayData = {};
    
    // Initialize days
    for (let i = 1; i <= 14; i++) {
      dayData[`Day ${i}`] = { day: `Day ${i}` };
    }
    
    // Add insight data for each day
    insightData.forEach(insight => {
      const insightName = insight.name.length > 30 
        ? insight.name.substring(0, 30) + "..." 
        : insight.name;
      
      Object.entries(insight.riskByDay).forEach(([day, risk]) => {
        if (dayData[day]) {
          dayData[day][insightName] = risk;
        }
      });
    });
    
    return Object.values(dayData);
  };

  // Format data for total risk line chart - all sprints
  const getLineChartData = () => {
    // Create combined dataset for all sprints
    const combinedData = [];
    
    // Initialize with day values
    for (let i = 1; i <= 14; i++) {
      combinedData.push({ day: `Day ${i}` });
    }
    
    // Add data for each sprint
    Object.entries(sprintRisks).forEach(([sprintName, sprintData]) => {
      sprintData.chartData.forEach((dataPoint) => {
        const dayIndex = parseInt(dataPoint.day.split(' ')[1]) - 1;
        if (dayIndex >= 0 && dayIndex < combinedData.length) {
          combinedData[dayIndex][sprintName] = dataPoint.risk;
        }
      });
    });
    
    return combinedData;
  };

  // Get available sprints for dropdown
  const getAvailableSprints = () => {
    return Object.keys(sprintRisks).sort((a, b) => {
      const numA = parseInt(a.split(' ')[1]);
      const numB = parseInt(b.split(' ')[1]);
      return numB - numA; // Sort descending (newest first)
    });
  };

  // Get insight colors (for stacked bar chart)
  const getInsightColors = () => {
    const colors = [
      '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', 
      '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
    ];
    
    const insightColors = {};
    
    if (selectedSprint && insightsBySprint[selectedSprint]) {
      insightsBySprint[selectedSprint].forEach((insight, index) => {
        const insightName = insight.name.length > 30 
          ? insight.name.substring(0, 30) + "..." 
          : insight.name;
        
        insightColors[insightName] = colors[index % colors.length];
      });
    }
    
    return insightColors;
  };

  if (loading) {
    return <div className="p-4">Loading sprint risk data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sprint Risk Dashboard</h1>
      
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="mr-2 font-medium">Select Sprint for Details:</label>
          <select 
            value={selectedSprint} 
            onChange={(e) => setSelectedSprint(e.target.value)}
            className="p-2 border rounded"
          >
            {getAvailableSprints().map(sprint => (
              <option key={sprint} value={sprint}>{sprint}</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {getAvailableSprints().map((sprintName, index) => {
            let color;
            if (sprintName === selectedSprint) {
              color = '#0047AB'; // Cobalt Blue for selected sprint
            } else {
              const blues = ['#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB'];
              const otherIndex = getAvailableSprints()
                .filter(s => s !== selectedSprint)
                .indexOf(sprintName);
              color = blues[otherIndex % blues.length];
            }
            
            return (
              <div key={sprintName} className="flex items-center gap-1">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className={`text-sm ${sprintName === selectedSprint ? 'font-bold' : ''}`}>
                  {sprintName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedSprint && sprintRisks[selectedSprint] && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p><span className="font-medium">Start Date:</span> {sprintRisks[selectedSprint].startDate}</p>
          <p><span className="font-medium">End Date:</span> {sprintRisks[selectedSprint].endDate}</p>
          <p className="text-sm text-gray-600 mt-1">Sprint duration: 14 days</p>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Risk Trends Across All Sprints</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart
              data={getLineChartData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
            {getAvailableSprints().map((sprintName, index) => {
                // Create a color palette based on whether this is the selected sprint
                let color;
                if (sprintName === selectedSprint) {
                  // Bold blue for selected sprint
                  color = '#0047AB'; // Cobalt Blue
                } else {
                  // Lighter blues for other sprints, getting progressively lighter
                  const blues = ['#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB'];
                  const otherIndex = getAvailableSprints()
                    .filter(s => s !== selectedSprint)
                    .indexOf(sprintName);
                  color = blues[otherIndex % blues.length];
                }
                
                return (
                  <Line 
                    key={sprintName}
                    type="monotone" 
                    dataKey={sprintName} 
                    stroke={color} 
                    name={sprintName} 
                    strokeWidth={sprintName === selectedSprint ? 3 : 1.5}
                    dot={{ r: sprintName === selectedSprint ? 4 : 3 }}
                    activeDot={{ r: sprintName === selectedSprint ? 6 : 5 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Individual Insight Risks</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer>
            <BarChart
              data={getStackedBarData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" angle={-45} textAnchor="end" height={60} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ bottom: -60 }} />
              {selectedSprint && insightsBySprint[selectedSprint] && 
                insightsBySprint[selectedSprint].map(insight => {
                  const insightName = insight.name.length > 30 
                    ? insight.name.substring(0, 30) + "..." 
                    : insight.name;
                  return (
                    <Bar 
                      key={insightName} 
                      dataKey={insightName} 
                      stackId="a" 
                      fill={getInsightColors()[insightName]}
                    />
                  );
                })
              }
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-2">Insights List</h2>
        <div className="overflow-auto max-h-96 border rounded">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Insight</th>
                <th className="p-2 text-left">Impact</th>
                <th className="p-2 text-left">Weight</th>
                <th className="p-2 text-left">Last Day Risk</th>
              </tr>
            </thead>
            <tbody>
              {selectedSprint && insightsBySprint[selectedSprint] && 
                insightsBySprint[selectedSprint].map((insight, index) => {
                  const lastDayKey = `Day 14`;
                  const lastDayRisk = insight.riskByDay[lastDayKey] || 0;
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-2 border-t">{insight.name}</td>
                      <td className="p-2 border-t">{insight.impact}</td>
                      <td className="p-2 border-t">{insight.weight}</td>
                      <td className="p-2 border-t">{lastDayRisk}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SprintRiskDashboard;