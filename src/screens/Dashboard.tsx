import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

// ---- Stat Card Component ----
interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
  subtext: string;
}
const StatCard = ({
  title,
  value,
  change,
  description,
  subtext,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="flex items-center text-xs font-medium px-2 py-1 rounded-md bg-black text-white">
          {isPositive ? (
            <ArrowUpRight size={14} className="mr-1" />
          ) : (
            <ArrowDownRight size={14} className="mr-1" />
          )}
          {change}%
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm font-medium text-gray-800 flex items-center">
        {description}
        <ArrowUpRight size={14} className="ml-1" />
      </p>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  );
};

export default function Dashboard() {
  // Stat Cards Data
  const stats = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      change: 12.5,
      description: "Trending up this month",
      subtext: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: "1,234",
      change: -20,
      description: "Down 20% this period",
      subtext: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      change: 12.5,
      description: "Strong user retention",
      subtext: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      change: 4.5,
      description: "Steady performance increase",
      subtext: "Meets growth projections",
    },
  ];

  // Chart Data
  const data = [
    { date: "Jun 24", visitors: 100 },
    { date: "Jun 25", visitors: 80 },
    { date: "Jun 26", visitors: 150 },
    { date: "Jun 27", visitors: 120 },
    { date: "Jun 28", visitors: 70 },
    { date: "Jun 29", visitors: 90 },
    { date: "Jun 30", visitors: 160 },
  ];

  // Table Data
  const tableData = [
    {
      header: "Cover page",
      type: "Cover page",
      status: "In Process",
      target: 18,
      limit: 5,
      reviewer: "Eddie Lake",
    },
    {
      header: "Table of contents",
      type: "Table of contents",
      status: "Done",
      target: 29,
      limit: 24,
      reviewer: "Eddie Lake",
    },
    {
      header: "Executive summary",
      type: "Narrative",
      status: "Done",
      target: 10,
      limit: 13,
      reviewer: "Eddie Lake",
    },
    {
      header: "Technical approach",
      type: "Narrative",
      status: "Done",
      target: 27,
      limit: 23,
      reviewer: "Jannik Tashpulutov",
    },
    {
      header: "Design",
      type: "Narrative",
      status: "In Process",
      target: 2,
      limit: 18,
      reviewer: "Jannik Tashpulutov",
    },
    {
      header: "Capabilities",
      type: "Narrative",
      status: "In Process",
      target: 20,
      limit: 20,
      reviewer: "Jannik Tashpulutov",
    },
    {
      header: "Integration with existing systems",
      type: "Narrative",
      status: "In Process",
      target: 19,
      limit: 21,
      reviewer: "Jannik Tashpulutov",
    },
    {
      header: "Innovation and Advantages",
      type: "Narrative",
      status: "Done",
      target: 25,
      limit: 26,
      reviewer: "Assign reviewer…",
    },
  ];

  const isLoading = true;

  if (!isLoading) return <DashboardSkeleton />;

  return (
    <div className="px-6 space-y-4 bg-white min-h-screen w-full overflow-y-auto">
      <div>
        <h1 className="font-semibold text-xl">Dashboard</h1>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Chart */}
      <div>
        <h1 className="font-semibold text-xl">Progresses</h1>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700 font-medium">Total Visitors</h3>
          <div className="space-x-2">
            <button className="px-3 py-1 text-xs rounded-md bg-black text-white">
              Last 3 months
            </button>
            <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700">
              Last 30 days
            </button>
            <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700">
              Last 7 days
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorVisitors)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <h1 className="p-2 font-semibold text-xl">Resent Orders</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700">Header</TableHead>
              <TableHead className="text-gray-700">Section Type</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-gray-700">Target</TableHead>
              <TableHead className="text-gray-700">Limit</TableHead>
              <TableHead className="text-gray-700">Reviewer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.header}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      row.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.limit}</TableCell>
                <TableCell>{row.reviewer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="px-6 space-y-4 bg-white min-h-screen w-full overflow-y-auto">
      <div>
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-4 shadow-sm space-y-3"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      <div>
        <Skeleton className="h-6 w-36" />
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-5 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-[250px] w-full rounded-lg" />
      </div>

      <Skeleton className="h-6 w-40 mt-2" />
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-6 gap-4 mb-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
