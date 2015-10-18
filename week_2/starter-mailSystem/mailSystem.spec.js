var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var mailSystem = require('./mailSystem');
var smtpTransport = require('./smtpTransport');
var repository = require('./repository');




describe('mailSystem', function() {

    beforeEach(function() {
        mailSystem.init('info@euri.com');
    });

    it('smtpTransport is called with correct args', function() {
        var spy = sinon.stub(smtpTransport, 'send');

        mailSystem.sendWelcomeMail('peter.cosemans@gmail.com',
                                   'Welcome to...',
                                   { name: 'peter'});

        expect(spy).to.have.been.called;

        var mail = spy.args[0][0];
        expect(mail.subject).to.equal('Welcome to...');
    });


    it('sendWelcomeMail: "to" is required', function() {

        expect(function() {
            mailSystem.sendWelcomeMail('',
                                   'Welcome to...',
                                   { name: 'peter'})
        }).to.throw(Error);
    });

    it('test', function() {
        // arrange
        var mails = [
            { id: 123, to: 'peter.cosemans@gmail.com', body: 'aaaa...'},
            { id: 123, to: 'wim.vanhoye@euri.com', body: 'bbb...'}
        ]
        var stub = sinon.stub(repository, 'getMails').returns(mails);
        var backend = {
            transfer: sinon.stub()
        }

        // var backend = {
        //     transfer: function() {
        //     }
        // };
        // var spy = sinon.spy(backend, 'transfer');

        // act
        mailSystem.transferEuriMails(backend);

        // assert
        expect(backend.transfer).to.have.been.called;
        var tranferredMails = backend.transfer.args[0][0];
        expect(tranferredMails.length).to.equal(1);
        expect(tranferredMails[0].to).to.equal(mails[1].to);
    });


})

