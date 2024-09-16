import { equal } from 'node:assert';
import { describe, it, after, before } from 'node:test'
import app from '../src/app'
import supertest from 'supertest';

async function makeRequest(url: string, data: any) {
    const request = await fetch(`http://localhost:8080/api/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return request;
}

// G3
describe('HTTP /api/login', () => {


    it('Deve retornar 200', async () => {
        const input = {
            email: 'edson@growdev.com.br',
            password: '123456'
        }
        const response = await supertest(app).post('/api/login').send(input)

        equal(response.status, 200)
    })
})