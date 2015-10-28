var expect = chai.expect;

describe('filter test', function(){
    beforeEach(module('app'));

    var dateFilter;
    beforeEach(inject(function(_dateFormatFilter_){
        dateFilter = _dateFormatFilter_;
    }));

    it('Filter formats data', function(){
        expect(dateFilter('1988-10-12T23:00:00.000Z')).to.equal('Oct 13 1988');
    });

    it('Filter formats data - short format', function(){
        expect(dateFilter('1988-10-13')).to.equal('Oct 13 1988');
    });

    it('Filter formats data if it is an empty string', function(){
        //Invalid date
        expect(dateFilter('')).to.equal('');
    });

    it('Filter formats data if it is a string', function(){
        expect(dateFilter('blabla')).to.equal('blabla');
    });

    it('Filter formats data if it is an empty string', function(){
        //Invalid date
        var date = new Date();
        var formattedDate = moment(date).format('MMM DD YYYY');
        expect(dateFilter(date)).to.equal(formattedDate);
    });

    it('Filter formats data if it is 0', function(){
        //gives back 'Jan 1, 1970'
        expect(dateFilter(5)).to.equal(5);
    });

    it('Filter formats data if it is UNDEFINED', function(){
        //gives back 'Jan 1, 1970'
        expect(dateFilter(undefined)).to.equal(undefined);
    });

    it('Filter formats data if it is NULL', function(){
        //gives back 'Jan 1, 1970'
        expect(dateFilter(null)).to.equal(null);
    });
});
