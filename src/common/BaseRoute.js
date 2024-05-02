class BaseRoute {
    base(method, path, handler) {
        return {
            method: method,
            path: path,
            handler: handler
        };
    }

    post(path, handler) {
        return this.base('POST', path, handler);
    }

    get(path, handler) {
        return this.base('GET', path, handler);
    }

    put(path, handler) {
        return this.base('PUT', path, handler);
    }

    patch(path, handler) {
        return this.base('PATCH', path, handler);
    }

    delete(path, handler) {
        return this.base('DELETE', path, handler);
    }

    group(path, routes) {
        return routes.map(route => {
            route.path = path + route.path;
            return route;
        });
    }
}

const Route = new BaseRoute();

module.exports = Route;