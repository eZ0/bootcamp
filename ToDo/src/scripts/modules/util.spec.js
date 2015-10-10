describe('util service', function(){

    describe('pluralize', function(){

        it("should return bananas for 2 banana", function() {
            var result = util.pluralize(2, "banana");
            expect(result).toBe("bananas");
        });

        it("should return banana for 1 banana", function() {
            var result = util.pluralize(1, "banana");
            expect(result).toBe("banana");
        });

        it("should return banana for -1 banana", function() {
            var result = util.pluralize(-1, "banana");
            expect(result).toBe("banana");
        });

        it("should return banana for '' & apple", function() {
            var result = util.pluralize('',"apple");
            expect(result).toBe("apple");
        });

        it("should return banana for '2' banana", function() {
            var result = util.pluralize('2',"banana");
            expect(result).toBe("bananas");
        });

    });

    describe('uuid', function(){
        it("should return random unique string", function() {
            var result1 = util.uuid();
            var result2 = util.uuid();
            expect(result1).not.toBe(result2);
        });

        it("should return string of the same length", function() {
            var result1 = util.uuid();
            var result2 = util.uuid();
            expect(result1.length).toBe(result2.length);
        });
    });

});
