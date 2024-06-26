import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';

import { useNavigation } from '@react-navigation/native';
import { act } from '@testing-library/react-native';

jest.mock('@react-native-firebase/firestore');

const mockUser = { email: 'test@example.com' };

const mockCreateUserWithEmailAndPassword = jest.fn();

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    createUserWithEmailAndPassword:
      mockCreateUserWithEmailAndPassword.mockResolvedValue({
        id: 'id',
        name: 'TestName',
        thumbnail: 'thumbnail_test',
        email: 'test@gmail.com',
      }),
  })),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      add: jest.fn(() => ({
        _documentPath: {
          _parts: [null, ''],
        },
      })),
    }),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        docs: [{ data: jest.fn().mockReturnValue(mockUser) }],
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

describe('useAuth hook', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeAll(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
  });

  it('should handle user login', async () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user.email).toBe('');
  });

  it('should call function create user', async () => {
    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.createUser({
        email: 'test@gmail.com',
        name: 'Test',
        password: '1234456',
      });
    });

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });
});
