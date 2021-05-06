import { CircularProgress } from '@material-ui/core';
import { useStoreContext } from './GlobalStore';

function LoadingOverlay() {

  const [store] = useStoreContext();

  if (store.showLoad) return(
    <div className="loading-overlay">
      <CircularProgress />
    </div>
  )
  else return null;
}

export default LoadingOverlay;