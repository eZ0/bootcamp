describe('calc service', function(){

    beforeEach(function(){
        console.log('before master');
    });

    describe('adding', function(){

        beforeEach(function(){
            console.log('before');
        });
        afterEach(function(){
            console.log('after');
        });

        it("should return 2 for 1 + 1", () => {
            var result = calc.add(1,1);
            expect(result).toBe(2);
        });

        it("should return 101 for 100 + 1", () => {
            var result = calc.add("100","1");
            expect(result).toBe(101);
        });

        it("should return -30 for -10 + -20", () => {
            var result = calc.add(-10,-20);
            expect(result).toBe(-30);
        });

        it("should return 10 for 10 + null", () => {
            var result = calc.add(10);
            expect(result).toBe(10);
        });

        it("should return 90 for null + 90", () => {
            var result = calc.add(null,90);
            expect(result).toBe(90);
        });

    });

    describe('multiply', function(){
        it("should return 15 for 3 * 5", () => {
            var result = calc.multiply(3,5);
            expect(result).toBe(15);
        });

        it("should return -15 for -3 * 5", () => {
            var result = calc.multiply(-3,5);
            expect(result).toBe(-15);
        });

    });

});
