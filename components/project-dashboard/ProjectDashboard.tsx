import ContributionDistribution from "./ContributionDistribution";
import IncompletedTaskTable from "./IncompletedTaskTable";
import NewDraft from "./NewDraft";
import NewRequirement from "./NewRequirement";
import TaskDistribution from "./TaskDistribution";

export default function ProjectDashboard() {
    return (
        <>
            <NewDraft />
            <NewRequirement />
            <IncompletedTaskTable />
            <ContributionDistribution />
            <TaskDistribution />
        </>
    );
}
