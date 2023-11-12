export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>Super group ID: {id}</div>;
}
