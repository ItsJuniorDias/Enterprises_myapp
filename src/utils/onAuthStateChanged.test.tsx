import { onAuthStateChanged } from './onAuthStateChanged';
import { AuthActionEnum } from '../hooks';

const mockUser = { email: 'test@example.com' };

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest
      .fn()
      .mockImplementation((callback) => callback(mockUser)),
  })),
}));

const mockUserDoc = {
  _data: {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    thumbnail: 'thumbnail_url',
  },
};

const mockUsers = { _docs: [mockUserDoc] };

const mockGetFireStore = jest.fn();

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn().mockResolvedValue(mockUsers),
    })),
  })),
}));

describe('onAuthStateChanged function', () => {
  const dispatchAuthState = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch user data and navigate to Home when user is found', async () => {
    mockGetFireStore.mockResolvedValue(mockUsers);

    await onAuthStateChanged({ dispatchAuthState, navigation });

    expect(dispatchAuthState).toHaveBeenCalledWith({
      type: AuthActionEnum.LOGGED,
      payload: {
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          thumbnail: 'thumbnail_url',
        },
      },
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Home');
  });
});
