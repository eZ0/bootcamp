describe('todoRepo service', function(){

    describe('init', function(){

        beforeEach(function() {
            spyOn(todoRepo, 'init').andCallThrough;
        });

        it("should be called", function() {
            todoRepo.init();
            expect(todoRepo.init).toHaveBeenCalled();
        });

        it("should be initializing", function() {
            expect(todoRepo.init).toBeDefined();
            todoRepo.init();
            expect(todoRepo.init).toHaveBeenCalled();
        });
    });

    describe('add', function(){

        beforeEach(function() {
            todoRepo.init();
            todoRepo.add("feed the guinea pig");
        });

        it("should be able to add new task to todo", function(){
            var list = todoRepo.getList();
            var length = list.length;
            todoRepo.add("read about closures in JS");
            var length1 = list.length;

            expect(length).not.toBe(length1);
        });
    });

    describe('getList', function(){

        beforeEach(function() {
            todoRepo.init();
            todoRepo.add("feed the guinea pig");
            todoRepo.add("buy bread and cheese");
        });

        it("should be able to get the list", function(){
            var list = todoRepo.getList();
            expect(list.length).toEqual(2);
        });

        it("should be able to get the list of active tasks", function(){
            var list = todoRepo.getList('active');
            expect(list[0].completed).toBe(false);
        });
    });

    describe('remove', function(){

        beforeEach(function() {
            todoRepo.init();
            todoRepo.add("feed the guinea pig");
            todoRepo.add("buy bread and cheese");
        });

        it("should be able to remove an item from the list", function(){
            var list = todoRepo.getList();
            var length = list.length;
            todoRepo.remove(list[1].id);
            var length1 = list.length;
            expect(length).not.toBe(length1);
        });

    });

});
