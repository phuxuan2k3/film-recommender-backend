import { createProjection } from './create-projection';

// CLI: npx jest src/query/common/helper/helper.spec.ts

class TestType {
    _id: string;
    name: string;
    age: number;
    isActive: boolean;
}

describe('createProjection', () => {
    it('should create a projection object with all properties set to 1', () => {
        const projection = createProjection(TestType);
        console.log(projection);
        type keys = keyof TestType;
        expect(projection).toEqual({
            _id: 1,
            name: 1,
            age: 1,
            isActive: 1
        });
    });
});
