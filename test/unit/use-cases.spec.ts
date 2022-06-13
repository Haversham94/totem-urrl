import request from 'supertest';
import { app } from '../../src/app';

describe('Short Url Generator', () => {
  describe('given an URL not satisfying the RFC 7230 schema', () => {
    it('returns an appropriate error', async () => {
      const { body: shortUrlResponseErrorPayload } = await request(app)
        .post('/api/shorturl')
        .send({
          url: 'https://lunii',
        })
        .expect(400);

      expect(shortUrlResponseErrorPayload).toMatchInlineSnapshot(`
        Object {
          "error": "Invalid url",
        }
      `);
    });
  });

  describe('given an valid URL payload that statisfies the RFC 7230 schema', () => {
    it('returns the expected response payload', async () => {
      const { body: shortUrlResponsePayload } = await request(app)
        .post('/api/shorturl')
        .send({
          url: 'https://www.lunii.com',
        })
        .expect(201);

      expect(shortUrlResponsePayload).toMatchInlineSnapshot(`
        Object {
          "originalUrl": "https://www.lunii.com",
          "shortUrl": "localhost:3000/l2345I",
        }
      `);
    });
  });

  describe('given an stored shortUrlId', () => {
    it('should redirect to the originalUrl', async () => {
      await request(app).post('/api/shorturl').send({
        url: 'https://www.lunii.com',
      });

      const { headers: responseHeaders } = await request(app).get(
        '/api/shorturl/l2345I',
      );

      expect(responseHeaders.location).toBe('https://www.lunii.com');
    });
  });

  describe('given an stored urls', () => {
    describe('when fetching analytics', () => {
      it('should return  the expected output', async () => {
        await request(app).post('/api/shorturl').send({
          url: 'https://www.lunii.com',
        });
        await request(app).post('/api/shorturl').send({
          url: 'https://www.youpi.com',
        });

        await request(app).get('/api/shorturl/l2345I');
        await request(app).get('/api/shorturl/l2345I');
        await request(app).get('/api/shorturl/l2345I');

        const { body: analyticsResponse } = await request(app)
          .get('/api/shorturl/analytics')
          .expect(200);

        expect(analyticsResponse).toMatchInlineSnapshot(`
          Array [
            Object {
              "nbClicks": 3,
              "originalUrl": "https://www.lunii.com",
              "shortUrl": "localhost:3000/l2345I",
            },
            Object {
              "nbClicks": 0,
              "originalUrl": "https://www.youpi.com",
              "shortUrl": "localhost:3000/l2345I",
            },
          ]
`);
      });
    });
  });
});
