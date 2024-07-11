import { http } from 'msw';

export const handlers = [
    http.post('*', (req, res, ctx) => {
        return res(
            ctx.status(401),
            ctx.json({ message: 'Invalid username or password' })
        );
    }),
];
