import Nav from '@/components/common/Nav';
import "./style.css";

export default (props: any) => {

  return (
  <div>
    <div className='header'>
      <Nav />
    </div>
    <div className='body'>{props.children}</div>
  </div>
  );
}
