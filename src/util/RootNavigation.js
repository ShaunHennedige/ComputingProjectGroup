import {createNavigationContainerRef} from '@react-navigation/native';

// https://reactnavigation.org/docs/navigating-without-navigation-prop/
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
