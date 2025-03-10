import { Container } from '@/components/container';
import { NewProjectForm } from '@/components/new-project-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateNewProjectPage = () => {
	return (
		<Container variant='dashboard'>
			<div className='flex justify-center'>
				<Card className='w-2/5'>
					<CardHeader>
						<CardTitle className='text-xl font-bold capitalize'>
							Create project
						</CardTitle>
					</CardHeader>
					<CardContent>
						<NewProjectForm />
						{/* <form>
							<div className='grid w-full items-center gap-6'>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='title'>Title</Label>
									<Input
										type='text'
										id='title'
										name='title'
										placeholder='Title'
										required
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='description'>Description</Label>
									<Textarea
										name='description'
										id='description'
										placeholder='Description'
										required
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='stack'>Stack</Label>
									<Input
										type='text'
										id='stack'
										name='stack'
										placeholder='Next.js, React.js, MongoDB...'
										required
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<div className='flex flex-col space-y-1.5'>
										<Label htmlFor='website'>Website</Label>
										<Input
											type='url'
											id='website'
											name='website'
											placeholder='Enter website link'
										/>
									</div>
									<div className='flex items-center space-x-2'>
										<Checkbox id='terms' />
										<label
											htmlFor='terms'
											className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
										>
											Hidden
										</label>
									</div>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<div className='space-y-1.5'>
										<Label htmlFor='website'>Github</Label>
										<Input
											type='url'
											id='github'
											name='github'
											placeholder='Enter github link'
										/>
									</div>
									<div className='flex items-center space-x-2'>
										<Checkbox id='terms' />
										<label
											htmlFor='terms'
											className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
										>
											Hidden
										</label>
									</div>
								</div>
							</div>
						</form> */}
					</CardContent>
				</Card>
			</div>
		</Container>
	);
};

export default CreateNewProjectPage;
