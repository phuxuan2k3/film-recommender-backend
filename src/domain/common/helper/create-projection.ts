export const createProjection = <T>(ctor: { new(): T }): Record<keyof T, 1> => {
    const instance = new ctor();
    const projection: Record<string, 1> = {};
    for (const key in instance) {
        if (Object.prototype.hasOwnProperty.call(instance, key)) {
            projection[key] = 1;
        }
    }
    return projection as Record<keyof T, 1>;
};