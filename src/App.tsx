import { Typography } from './renderers/components/atoms/typographies/Typography'
import { Badge } from './renderers/components/molecules/badge/Badge'
import { Button } from './renderers/components/molecules/button/Button'
import { RetroConfig } from './RetroConfig'
import { SprintRiskLineChart } from './SprintRiskLineChart'


function App() {

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">
     <div className="flex justify-between items-center">


     <div className="flex items-center gap-3">
      <Typography.Heading2>Run a Retro</Typography.Heading2>
      <Badge label="BETA"/>
      </div>

      <Button color="alternative" >Share</Button>
     </div>

     <RetroConfig />

    <SprintRiskLineChart />
    </div>
  )
}

export default App
