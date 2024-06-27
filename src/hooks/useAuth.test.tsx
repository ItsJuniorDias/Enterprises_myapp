import { renderHook } from '@testing-library/react-hooks';
import { AuthActionEnum, useAuth } from './useAuth';

import { useNavigation } from '@react-navigation/native';
import { act } from '@testing-library/react-native';

jest.mock('@react-native-firebase/firestore');

const mockUser = { email: 'test@example.com', password: '1234567' };

const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockOnAuthStateChanged = jest.fn();
const mockSignOut = jest.fn();

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged.mockReturnValue(mockUser),
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    signOut: mockSignOut,
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
      doc: jest.fn(() => ({
        update: jest.fn().mockResolvedValue({}),
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

jest.useFakeTimers();

describe('useAuth hook', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
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

  it('should call function logout', async () => {
    const { result } = renderHook(() => useAuth());

    result.current.logout();

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should call function createUser', async () => {
    mockCreateUserWithEmailAndPassword.mockResolvedValueOnce({
      id: 'id',
      name: 'TestName',
      thumbnail: 'thumbnail_test',
      email: 'test@gmail.com',
    });

    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.createUser({
        email: 'test@gmail.com',
        name: 'Test',
        password: '1234456',
      });
    });

    jest.runAllTimers();

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call function error createUser', async () => {
    const errorMessage = 'Registration failed';

    mockCreateUserWithEmailAndPassword.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.createUser({
        email: '',
        name: '',
        password: '',
      });
    });

    jest.runAllTimers();

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call function login', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({});

    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.login({
        email: 'test@gmail.com',
        password: '123456',
      });
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call case default', async () => {
    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.dispatchAuthState({
        type: AuthActionEnum.DEFAULT,
        payload: {},
      });
    });

    expect(result.current.user).toEqual({
      email: '',
      id: '',
      name: '',
      thumbnail: '',
    });
  });

  it('should call function LOGGED', async () => {
    const { result } = renderHook(() => useAuth());

    await act(() => {
      result.current.dispatchAuthState({
        type: AuthActionEnum.LOGGED,
        payload: {
          user: {
            id: 'id',
            name: 'Test',
            email: 'test@gmail.com',
            thumbnail: '',
          },
        },
      });
    });

    expect(result.current.user).toEqual({
      id: 'id',
      name: 'Test',
      email: 'test@gmail.com',
      thumbnail: '',
    });
  });
});
