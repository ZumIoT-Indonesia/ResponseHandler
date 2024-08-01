const express = require('express');
const request = require('supertest');
const resHandler = require('../index.js');

const app = express();

// function errorHandler(t) {
//     return (error, _request, _response) => {
//         t.fail(error.message);
//         next();
//     }
// }

const successResponseSingle = (isNull = false) => {
    if (isNull) {
        return {};
    }

    return {
        data: 'test'
    };
}

const successResponseArray = (isNull = false) => {
    if (isNull) {
        return [];
    }

    return [{
        data: 'test'
    }];
}

const errorResponse = () => {
    return Promise.reject(Error('Data Error'));
}

function logBody(res) {
    console.log('\n      body', res.body);
}

app.get('/readSingle/success', (_, res) => resHandler.readSingle(successResponseSingle(), res));
app.get('/readSingle/null', (_, res) => resHandler.readSingle(successResponseSingle(true), res));
app.get('/readSingle/null/message', (_, res) => resHandler.readSingle(successResponseSingle(true), res, 'Data Single Tidak Ditemukan'));
app.get('/readSingle/error', (_, res) => resHandler.readSingle(errorResponse(), res));

app.get('/readArray/success', (_, res) => resHandler.readSingle(successResponseArray(), res));
app.get('/readArray/null', (_, res) => resHandler.readSingle(successResponseArray(true), res));
app.get('/readArray/null/message', (_, res) => resHandler.readSingle(successResponseArray(true), res, 'Data Array Tidak Ditemukan'));
app.get('/readArray/error', (_, res) => resHandler.readSingle(errorResponse(), res));

app.post('/insert/success', (_, res) => resHandler.insert(successResponseSingle(), res));
app.post('/insert/success/message', (_, res) => resHandler.insert(successResponseSingle(true), res, 'Data Sukses Insert'));
app.post('/insert/error', (_, res) => resHandler.insert(errorResponse(), res));

app.put('/update/success', (_, res) => resHandler.update(successResponseSingle(), res));
app.put('/update/success/message', (_, res) => resHandler.update(successResponseSingle(true), res, 'Data Sukses Update'));
app.put('/update/error', (_, res) => resHandler.update(errorResponse(), res));

app.delete('/delete/success', (_, res) => resHandler.delete(successResponseSingle(), res));
app.delete('/delete/success/message', (_, res) => resHandler.delete(successResponseSingle(true), res, 'Data Sukses Delete'));
app.delete('/delete/error', (_, res) => resHandler.delete(errorResponse(), res));


describe('GET /readSingle', function () {
    it(`data should onSuccess`, function (done) {
        request(app)
            .get('/readSingle/success')
            .expect(logBody)
            .expect(200, {
                data: 'test'
            })
            .end(done)
    });

    it(`data should {}`, function (done) {
        request(app)
            .get('/readSingle/null')
            .expect(logBody)
            .expect(200, {})
            .end(done)
    });

    it(`data should message onNull`, function (done) {
        request(app)
            .get('/readSingle/null/message')
            .expect(logBody)
            .expect(200, {
                message: 'Data Single Tidak Ditemukan'
            })
            .end(done)
    });

    it(`data should message onError`, function (done) {
        request(app)
            .get('/readSingle/error')
            .expect(logBody)
            .expect(500, {
                message: 'Terjadi kesalahan!'
            })
            .end(done)
    })
})

describe('GET /readArray', function () {
    it(`data should onSuccess`, function (done) {
        request(app)
            .get('/readArray/success')
            .expect(logBody)
            .expect(200, [{
                data: 'test'
            }])
            .end(done)
    });

    it(`data should []`, function (done) {
        request(app)
            .get('/readArray/null')
            .expect(logBody)
            .expect(200, [])
            .end(done)
    });

    it(`data should message onNull`, function (done) {
        request(app)
            .get('/readArray/null/message')
            .expect(logBody)
            .expect(200, {
                message: 'Data Array Tidak Ditemukan'
            })
            .end(done)
    });

    it(`data should message onError`, function (done) {
        request(app)
            .get('/readArray/error')
            .expect(logBody)
            .expect(500, {
                message: 'Terjadi kesalahan!'
            })
            .end(done)
    })
})

describe('POST /insert', function () {
    it(`data should onSuccess`, function (done) {
        request(app)
            .post('/insert/success')
            .expect(logBody)
            .expect(200, {
                message: 'Data Berhasil Disimpan'
            })
            .end(done)
    });

    it(`data should message onSuccess`, function (done) {
        request(app)
            .post('/insert/success/message')
            .expect(logBody)
            .expect(200, {
                message: 'Data Sukses Insert'
            })
            .end(done)
    });

    it(`data should message onError`, function (done) {
        request(app)
            .post('/insert/error')
            .expect(logBody)
            .expect(500, {
                message: 'Terjadi kesalahan!'
            })
            .end(done)
    })
})

describe('PUT /update', function () {
    it(`data should onSuccess`, function (done) {
        request(app)
            .put('/update/success')
            .expect(logBody)
            .expect(200, {
                message: 'Data Berhasil Diubah'
            })
            .end(done)
    });

    it(`data should message onSuccess`, function (done) {
        request(app)
            .put('/update/success/message')
            .expect(logBody)
            .expect(200, {
                message: 'Data Sukses Update'
            })
            .end(done)
    });

    it(`data should message onError`, function (done) {
        request(app)
            .put('/update/error')
            .expect(logBody)
            .expect(500, {
                message: 'Terjadi kesalahan!'
            })
            .end(done)
    })
})

describe('DELETE /delete', function () {
    it(`data should onSuccess`, function (done) {
        request(app)
            .delete('/delete/success')
            .expect(logBody)
            .expect(200, {
                message: 'Data Berhasil Dihapus'
            })
            .end(done)
    });

    it(`data should message onSuccess`, function (done) {
        request(app)
            .delete('/delete/success/message')
            .expect(logBody)
            .expect(200, {
                message: 'Data Sukses Delete'
            })
            .end(done)
    });

    it(`data should message onError`, function (done) {
        request(app)
            .delete('/delete/error')
            .expect(logBody)
            .expect(500, {
                message: 'Terjadi kesalahan!'
            })
            .end(done)
    })
})