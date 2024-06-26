export const useEnterprises = jest.fn(() => ({
  state: {
    _data: [
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
    enterprises: [],
    loading: false,
    error: null,
  },
  dispatch: jest.fn(),
}));
