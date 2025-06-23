import { LuView } from "react-icons/lu";
import { GetFormStats } from "@/actions/form";
import { cn } from "@/lib/utils";
async function CardWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}
export default CardWrapper;

interface StatCardProps {
  data: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

const StatsCards = (props: StatCardProps) => {
  const { data, loading } = props;

  return (
  <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <StatsCard
          title="Total Visits"
          icon={<LuView className="h-6 w-6 text-blue-600" />}
          helperText="All time form visits"
          value={data.visits.toLocaleString()}
          loading={loading}
          className="transform transition-transform hover:scale-105"
        />
        <StatsCard
          title="Total Submissions"
          icon={<LuView className="h-6 w-6 text-green-600" />}
          helperText="All time form submissions"
          value={data.submissions.toLocaleString()}
          loading={loading}
          className="transform transition-transform hover:scale-105"
        />
        <StatsCard
          title="Submission Rate"
          icon={<LuView className="h-6 w-6 text-purple-600" />}
          helperText="Percentage of visits with submissions"
          value={`${data.submissionRate.toLocaleString()}%`}
          loading={loading}
          className="transform transition-transform hover:scale-105"
        />
        <StatsCard
          title="Bounce Rate"
          icon={<LuView className="h-6 w-6 text-red-600" />}
          helperText="Percentage of visits without interaction"
          value={`${data.bounceRate.toLocaleString()}%`}
          loading={loading}
          className="transform transition-transform hover:scale-105"
        />
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  helperText?: string;
  loading?: boolean;
  className?: string;
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          {title}
        </h2>
        <div className="rounded-full bg-gray-50 p-2">{icon}</div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        ) : (
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      <div className="absolute inset-0 border-t-4 border-blue-600 opacity-10" />
    </div>
  );
}
