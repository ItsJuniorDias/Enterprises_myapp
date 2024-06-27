import { renderHook } from '@testing-library/react-hooks';
import { EnterpriseActionEnum, useEnterprises } from './useEnterprises';

import { useNavigation } from '@react-navigation/native';

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
        docs: [
          {
            _data: {
              id: '',
              type: '',
              title: '',
              description: '',
              thumbnail: '',
              url_link: '',
              title_enterprise: '',
            },
          },
        ],
      }),
    }),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
        docs: [],
      }),
    }),
    add: jest.fn(),
    get: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn(),
  })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('useEnterprises hook', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeAll(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useEnterprises());

    expect(result.current.state.loading).toBe(true);
  });

  it('should call function dispatch', () => {
    const { result } = renderHook(() => useEnterprises());

    result.current.dispatch({
      type: EnterpriseActionEnum.FILTERED,
      payload: {
        dataFiltered: [],
        isFiltered: true,
      },
    });

    expect(result.current.state.isFiltered).toBe(true);
  });

  it('should call case default', () => {
    const { result } = renderHook(() => useEnterprises());

    result.current.dispatch({
      type: 'DEFAULT',
      payload: {},
    });

    expect(result.current.state.loading).toBe(true);
  });
});
