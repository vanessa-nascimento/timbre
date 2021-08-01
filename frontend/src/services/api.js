export function api(text, user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token:
              '91j893h281h9nf98fnf2309jd09jkkd0as98238j9fr8j98f9j8f298r829r-f',
            user: {
              nome: 'Manoela Costa',
              email: 'manoela.costa@email.com',
            },
          },
        });
      }, 2000);
    });
  }
  
  export const defaults = {
    headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc3MDQxMzF9.s6EEKX2JhbJfg2AXpKy6uDKqnRuQJenS2WrTTOLtyGs',
    },
  };

export default api;