import { State } from '~utils/state';
import { initNear } from './near';

export interface IInitialState {
  app: Object,
  near: Object,
  views: Object
}

const initialState: IInitialState = {
  app: {
    loading: true,
    mounted: false,
  },
  near: {
    initialized: false,
    account: false,
  },
  views: {
  }
};

export const { appStore, AppProvider } = State(initialState, 'app');

export const onAppMount = () => async ({ update, dispatch }) => {
  update('app', { mounted: true });
  dispatch(initNear());
};
