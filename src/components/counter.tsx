import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// import { increment, decrement, reset } from '../store/actions'

const Counter = () => {
  const count = useSelector((state: RootStateOrAny) => {
    return state?.count;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
      `}</style>
      <h1>
        Count: <span>{count}</span>
      </h1>
      {/*<button onClick={() => dispatch(increment())}>+1</button>*/}
      {/*<button onClick={() => dispatch(decrement())}>-1</button>*/}
      {/*<button onClick={() => dispatch(reset())}>Reset</button>*/}
    </div>
  );
};

export default Counter;
