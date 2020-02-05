import * as _ from 'lodash';
import axios from 'axios';

axios.interceptors.request.use(config => {
    // ensures that json-server updates db correctly
    if (config && config.headers && _.includes(['post', 'put', 'patch'], _.toLower(config.method))) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

export * from './todos'