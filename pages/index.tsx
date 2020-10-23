import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { wrapper} from '../store';
import { searchData } from '../screens/Home/data/actions';

// export const getStaticProps = wrapper.getStaticProps(
//   ({ store, preview }) => {
//     console.log('2. Page.getStaticProps uses the store to dispatch things');
//     store.dispatch({ type: 'TICK', payload: 'was set in other page 1111 ' + preview });
//     return { props: {test: 'dffdf' } }
//   }
// );

// you can also use `connect()` instead of hooks

interface dataProp {
  author: string,
  media: { m: string },
  tags: string,
  link: string,
  title: string,
}

const Page = () => {
  const { home } = useSelector<any, any>(state => state);
  const dispatch = useDispatch();
  console.log('home', home);
  const [txt, setTxt] = useState<string>('')


  const onChangeInput = (e: any) => {
    const textSearch = e.target.value;
    setTxt(textSearch);
    dispatch(searchData(textSearch))
  }

  const renderContent = (data: dataProp[]) => {
    if (!data || data.length <= 0) return <div>no result</div>
    return data.map((item: dataProp, index: number) => {
      return <div key={index} style={{ marginTop: '2rem' }}>
        <div>
          <div><img src={item.media.m} alt={item.title} /></div>
          <div><a href={item.link} target="_blank">{item.title}</a></div>
          <div>tags: {item.tags}</div>
        </div>
      </div>
    })
  }
  return (
    <div>
      <input
        onChange={onChangeInput}
        placeholder="text in here"
        value={txt}
      />
      {/* <button onClick={() => { dispatch(searchData(txt)) }}> click</button> */}
      <div className="search-content">
        {renderContent(home.data ? home.data.items : [])}
      </div>
    </div>
  );
};

export default Page;