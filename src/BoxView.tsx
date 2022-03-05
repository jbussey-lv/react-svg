export default function BoxView(props: any) {
  let { box } = props;
  return (
    <div>Box {box.size}</div>
  );
}