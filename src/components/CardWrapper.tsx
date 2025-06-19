import { LuView } from "react-icons/lu";
import { GetFormStats } from "@/actions/form";

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
    <div className="w-full pt-8 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="total visits"
        icon={<LuView className="text-blue-600" />}
        helperText="all time visits"
        value={data.visits.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      ></StatsCard>
      <StatsCard
        title="total submissions"
        icon={<LuView className="text-blue-600" />}
        helperText="all time submissions"
        value={data.submissions.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="total submissions"
        icon={<LuView className="text-blue-600" />}
        helperText="all time submissions"
        value={data.submissionRate.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="total submissions"
        icon={<LuView className="text-blue-600" />}
        helperText="all time submissions"
        value={data.bounceRate.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
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

function StatsCard(props: StatsCardProps) {
  const { title, value, icon, helperText, loading, className } = props;

  return (
    <div className={className}>
      <div>
        <h1>{title}</h1>
        <div>{icon}</div>
      </div>
      <div className="text-2xl font-bold">
        {loading ? <span className="animate-pulse">Loading...</span> : value}
      </div>
    </div>
  );
}
