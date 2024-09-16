import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import { describe, it, after, before, afterEach } from 'node:test'
import app from '../src/app'
import { knexClient } from '../src/config/knex-db';
import supertest from 'supertest';
import { randomUUID } from 'node:crypto';


describe('HTTP /api/register', () => {

    // afterEach(async () => {
    //     await knexClient.table('users').delete();
    // })

    it('Deve criar o usuário e retornar o status 201', async () => {
        const input = {
            email: 'edson@growdev.com.br',
            password: '123456',
            name: 'Édson Martins'
        }

        const response = await supertest(app).post('/api/register').send(input)

        strictEqual(response.status, 201)

        const userDB = await knexClient('users').where('email', 'edson@growdev.com.br').select('id', 'email', 'enable', 'name').first()
        const output = response.body;

        ok(userDB);
        ok(output);

        deepStrictEqual(output, {
            message: 'Usuário criado',
            data: {
                id: userDB?.id,
                email: 'edson@growdev.com.br',
                name: 'Édson Martins',
                enable: true,
            }
        })
        deepStrictEqual(userDB, {
            id: userDB?.id,
            email: 'edson@growdev.com.br',
            name: 'Édson Martins',
            enable: true,
        })
    })

    // it('Deve retornar 400 quando usuário já existe', async () => {
    //     const input = {
    //         email: 'edson@growdev.com.br',
    //         password: '123456',
    //         name: 'Édson Martins'
    //     }

    //     await knexClient
    //         .table('users')
    //         .insert({
    //             name: input.name,
    //             email: input.email,
    //             id: randomUUID(),
    //             password: '==='
    //         })

    //     const response = await supertest(app).post('/api/register').send(input)

    //     strictEqual(response.status, 400)

    //     const output = response.body;

    //     ok(output);

    //     deepStrictEqual(output, {
    //         message: 'Usuário já existe',
    //     })
    // })
})