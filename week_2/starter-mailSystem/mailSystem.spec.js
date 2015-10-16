var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var mailSystem = require('./mailSystem');
var smtpTransport = require('./smtpTransport');



describe('mailSystem', function() {
    it('smtpTransport is called', function() {
        var spy = sinon.spy(smtpTransport, 'send');

        mailSystem.init('info@euri.com');
        mailSystem.sendWelcomeMail('peter.cosemans@gmail.com',
                                   'Welcome to...',
                                   { name: 'peter'});

        expect(spy).to.have.been.called;

        var mail = spy.args[0][0];
        expect(mail.subject).to.equal('Welcome to...');
    });


    it('sendWelcomeMail: "to" is required', function() {
        mailSystem.init('info@euri.com');

        expect(function() {
            mailSystem.sendWelcomeMail('',
                                   'Welcome to...',
                                   { name: 'peter'})
        }).to.throw(Error);
    });

})

