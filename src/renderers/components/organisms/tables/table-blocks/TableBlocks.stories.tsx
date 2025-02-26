import { usePagination } from "@/hooks/use-pagination";
import { Pagination } from "@/renderers/components/organisms/tables/table-blocks/Pagination";
import type { Meta, StoryObj } from "@storybook/react";
import { v4 } from "uuid";
import { Table } from "./Table";
import { TableBody } from "./body/TableBody";
import { TableBodyCell } from "./body/TableBodyCell";
import { TableBodyRow } from "./body/TableBodyRow";
import { TableHeader } from "./header/TableHeader";
import { TableHeaderCell } from "./header/TableHeaderCell";
import { TableHeaderRow } from "./header/TableHeaderRow";

const meta = {
  component: Table,
  title: "organisms/tables/TableBlocks",
} satisfies Meta;

const tableData = {
  columns: [
    { key: "name", label: "Employee Name" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "startDate", label: "Start Date" },
    { key: "salary", label: "Salary" },
    { key: "status", label: "Employment Status" },
  ] as const,
  data: [
    {
      name: "John Doe",
      position: "Software Developer",
      department: "IT",
      startDate: "2020-05-15",
      salary: "$75,000",
      status: "Full-time",
    },
    {
      name: "Jane Smith",
      position: "Marketing Manager",
      department: "Marketing",
      startDate: "2018-03-01",
      salary: "$85,000",
      status: "Full-time",
    },
    {
      name: "Bob Johnson",
      position: "Data Analyst",
      department: "Analytics",
      startDate: "2021-09-01",
      salary: "$65,000",
      status: "Part-time",
    },
    {
      name: "Alice Brown",
      position: "UX Designer",
      department: "Design",
      startDate: "2022-01-10",
      salary: "$70,000",
      status: "Contract",
    },
    {
      name: "Eva Green",
      position: "HR Specialist",
      department: "Human Resources",
      startDate: "2023-04-20",
      salary: "$60,000",
      status: "Full-time",
    },
    {
      name: "Sam White",
      position: "Project Manager",
      department: "Project Management",
      startDate: "2021-07-15",
      salary: "$90,000",
      status: "Full-time",
    },
    {
      name: "Chris Evans",
      position: "DevOps Engineer",
      department: "IT",
      startDate: "2019-11-25",
      salary: "$92,000",
      status: "Full-time",
    },
    {
      name: "Nina Taylor",
      position: "Content Strategist",
      department: "Marketing",
      startDate: "2020-06-10",
      salary: "$68,000",
      status: "Full-time",
    },
    {
      name: "Liam Scott",
      position: "Business Analyst",
      department: "Business Development",
      startDate: "2017-08-05",
      salary: "$80,000",
      status: "Full-time",
    },
    {
      name: "Olivia Martin",
      position: "Graphic Designer",
      department: "Design",
      startDate: "2021-10-15",
      salary: "$72,000",
      status: "Contract",
    },
    {
      name: "Michael Lee",
      position: "IT Support Specialist",
      department: "IT",
      startDate: "2019-04-05",
      salary: "$55,000",
      status: "Part-time",
    },
    {
      name: "Sophia Anderson",
      position: "Recruiter",
      department: "Human Resources",
      startDate: "2022-02-25",
      salary: "$58,000",
      status: "Full-time",
    },
    {
      name: "James Wilson",
      position: "Accountant",
      department: "Finance",
      startDate: "2018-09-10",
      salary: "$78,000",
      status: "Full-time",
    },
    {
      name: "Emma Thompson",
      position: "Social Media Manager",
      department: "Marketing",
      startDate: "2021-03-20",
      salary: "$65,000",
      status: "Full-time",
    },
    {
      name: "Benjamin Harris",
      position: "Backend Developer",
      department: "IT",
      startDate: "2020-12-10",
      salary: "$88,000",
      status: "Full-time",
    },
    {
      name: "Lily Carter",
      position: "Sales Representative",
      department: "Sales",
      startDate: "2023-05-30",
      salary: "$60,000",
      status: "Contract",
    },
    {
      name: "Jack Miller",
      position: "Network Administrator",
      department: "IT",
      startDate: "2020-11-15",
      salary: "$83,000",
      status: "Full-time",
    },
    {
      name: "Grace Lee",
      position: "Product Manager",
      department: "Product",
      startDate: "2022-06-05",
      salary: "$95,000",
      status: "Full-time",
    },
    {
      name: "Henry Brown",
      position: "SEO Specialist",
      department: "Marketing",
      startDate: "2019-08-01",
      salary: "$62,000",
      status: "Full-time",
    },
    {
      name: "Laura Adams",
      position: "UI Developer",
      department: "Design",
      startDate: "2023-02-14",
      salary: "$70,000",
      status: "Full-time",
    },
    {
      name: "David Kim",
      position: "Operations Manager",
      department: "Operations",
      startDate: "2018-12-03",
      salary: "$88,000",
      status: "Full-time",
    },
    {
      name: "Zoe Clark",
      position: "QA Engineer",
      department: "IT",
      startDate: "2021-05-09",
      salary: "$67,000",
      status: "Full-time",
    },
    {
      name: "Ryan Lewis",
      position: "Legal Advisor",
      department: "Legal",
      startDate: "2020-04-11",
      salary: "$110,000",
      status: "Part-time",
    },
    {
      name: "Mia Foster",
      position: "Data Scientist",
      department: "Analytics",
      startDate: "2022-07-20",
      salary: "$95,000",
      status: "Full-time",
    },
    {
      name: "Ethan Hall",
      position: "Financial Analyst",
      department: "Finance",
      startDate: "2019-03-19",
      salary: "$80,000",
      status: "Full-time",
    },
    {
      name: "Chloe White",
      position: "Event Coordinator",
      department: "Marketing",
      startDate: "2021-11-17",
      salary: "$58,000",
      status: "Contract",
    },
    {
      name: "Lucas Green",
      position: "Full-stack Developer",
      department: "IT",
      startDate: "2022-09-01",
      salary: "$100,000",
      status: "Full-time",
    },
    {
      name: "Amelia Bell",
      position: "Public Relations Manager",
      department: "Marketing",
      startDate: "2017-06-30",
      salary: "$82,000",
      status: "Full-time",
    },
    {
      name: "Nathan Moore",
      position: "Cybersecurity Specialist",
      department: "IT",
      startDate: "2021-01-15",
      salary: "$105,000",
      status: "Full-time",
    },
    {
      name: "Ava Nelson",
      position: "Business Consultant",
      department: "Business Development",
      startDate: "2020-10-10",
      salary: "$87,000",
      status: "Contract",
    },
    {
      name: "Daniel Walker",
      position: "Support Engineer",
      department: "IT",
      startDate: "2021-08-23",
      salary: "$72,000",
      status: "Full-time",
    },
    {
      name: "Sophie Harris",
      position: "HR Consultant",
      department: "Human Resources",
      startDate: "2023-01-18",
      salary: "$65,000",
      status: "Contract",
    },
    {
      name: "Daniel Walker",
      position: "Support Engineer",
      department: "IT",
      startDate: "2021-08-23",
      salary: "$72,000",
      status: "Full-time",
    },
    {
      name: "Sophie Harris",
      position: "HR Consultant",
      department: "Human Resources",
      startDate: "2023-01-18",
      salary: "$65,000",
      status: "Contract",
    },
    {
      name: "Daniel Walker",
      position: "Support Engineer",
      department: "IT",
      startDate: "2021-08-23",
      salary: "$72,000",
      status: "Full-time",
    },
    {
      name: "Sophie Harris",
      position: "HR Consultant",
      department: "Human Resources",
      startDate: "2023-01-18",
      salary: "$65,000",
      status: "Contract",
    },
    {
      name: "Daniel Walker",
      position: "Support Engineer",
      department: "IT",
      startDate: "2021-08-23",
      salary: "$72,000",
      status: "Full-time",
    },
    {
      name: "Sophie Harris",
      position: "HR Consultant",
      department: "Human Resources",
      startDate: "2023-01-18",
      salary: "$65,000",
      status: "Contract",
    },
  ],
};

type Story = StoryObj;

export const TableBlocks: Story = {
  render: () => {
    const { page, pageSize, handlePageChange, applyPagination } = usePagination(tableData.data.length, 5);

    const paginatedItems = applyPagination(tableData.data);

    return (
      <div className="flex w-full flex-col">
        <Table>
          <TableHeader>
            <TableHeaderRow>
              {tableData.columns.map((column) => (
                <TableHeaderCell key={column.key}>{column.label}</TableHeaderCell>
              ))}
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((row, rowIndex) => (
              <TableBodyRow key={v4()}>
                {tableData.columns.map((column) => (
                  <TableBodyCell key={`${rowIndex}-${column.key}`}>{row[column.key]}</TableBodyCell>
                ))}
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalRows={tableData.data.length}
          page={page}
          pageSize={pageSize}
          handleNextPage={() => handlePageChange(page + 1)}
          handlePrevPage={() => handlePageChange(page - 1)}
        />
      </div>
    );
  },
};

export default meta;
