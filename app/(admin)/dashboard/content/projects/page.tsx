import { getProjectsData } from '@/actions';
import { Container } from '@/components/container';
import { columns } from '@/components/projects-table/columns';
import { DataTable } from '@/components/projects-table/data-table';

const ContentProjectsPage = async () => {
	const data = await getProjectsData();
	return (
		<Container variant='dashboard'>
			<DataTable columns={columns} data={data} />
		</Container>
	);
};

export default ContentProjectsPage;
