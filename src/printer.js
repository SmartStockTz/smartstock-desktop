const bfast = require('bfast');

/**
 *
 * @param {Electron.IpcMainInvokeEvent} e
 * @param {string} data
 */
module.exports.handlePrinting = async (e, data) => {
    if (!data || data === '') {
        throw new Error("Data is required");
    }
    bfast.init({
        applicationId: 't', projectId: 't', adapters: {
            cache: (config) => ({
                set: () => ({}),
                get: () => ({})
            })
        }
    }, 't');
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
    try {
        await bfast.functions('t').request('https://localhost:8080/print').post({
            data: data,
            id: Math.random().toString().replaceAll('.', '')
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json'
            }
        });
    } catch (e) {
        throw e;
    } finally {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '1';
    }
    return 'done printing';
}

/**
 *
 * @param {Electron.IpcMainInvokeEvent} e
 */
module.exports.handlePrinters = async (e) => {
    return [];
}
