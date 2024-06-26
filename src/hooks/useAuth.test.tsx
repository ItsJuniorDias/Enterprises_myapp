import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';

import { useNavigation } from '@react-navigation/native';

const mockUser = { email: 'test@example.com' };

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(),
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
});
