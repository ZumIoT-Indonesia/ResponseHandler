/***
 * Event
 */

function mapTrim(obj) {
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'string' && obj[k] !== null) {
            obj[k] = obj[k].trim()
        }
        
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            obj[k] = mapTrim(obj[k]);
            
        }
    });

    return obj;
}

function _onSuccess(res, data) {
    res.status(200).send(mapTrim(data));
}

function _onSuccessMsg(res, message) {
    res.status(200).send({
        message: message
    });
}

function _onNullMsg(res, message) {
    res.status(200).send({
        message: message
    });
}

function _onError(res, err) {
    console.log(`Error -> ${err.name} : ${err.message}`);
    res.status(500).send({
        message: 'Terjadi kesalahan!'
    })
}

/***
 * ResponseHandler
 */

exports.readSingle = async (fn, res, message = null) => {
    try {
        let data = await fn;

        data = JSON.parse(JSON.stringify(data));

        if (data === null) {
            data = {};
        }

        if (Object.keys(data).length === 0 && message != null) {
            return _onNullMsg(res, message)
        }

        return _onSuccess(res, data);
    } catch (err) {
        return _onError(res, err);
    }
}

exports.readArray = async (fn, res, message = null) => {
    try {
        let data = await fn;

        data = JSON.parse(JSON.stringify(data));

        if ((data === null || data.length === 0) && message != null) {
            return _onNullMsg(res, message)
        }

        return _onSuccess(res, data);
    } catch (err) {
        return _onError(res, err);
    }
}

exports.insert = async (fn, res, message = null) => {
    message = message || 'Data Berhasil Disimpan'

    try {
        await fn;

        return _onSuccessMsg(res, message);

    } catch (err) {
        return _onError(res, err);
    }
}

exports.update = async (fn, res, message = null) => {
    message = message || 'Data Berhasil Diubah'

    try {
        await fn;

        return _onSuccessMsg(res, message);

    } catch (err) {
        return _onError(res, err);
    }
}

exports.delete = async (fn, res, message = null) => {
    message = message || 'Data Berhasil Dihapus'

    try {
        await fn;

        return _onSuccessMsg(res, message);

    } catch (err) {
        return _onError(res, err);
    }
}

exports.mapTrim = mapTrim;