import { EmailService, SendMailOptions } from "./email.services";
import nodemailer from 'nodemailer';


describe('Test EmailService', () => {
  const emailService = new EmailService();

  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendEmail: mockSendMail
  });

  test('should send email', async() => {


    const options: SendMailOptions = {
      to: 'nestor.ramos.lxxx@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    }

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({});
    // expect(mockSendMail).toHaveBeenCalledWith({
    //   attachments: expect.any(Array),
    //   html: "<h1>Test</h1>",
    //   subject: "Test",
    //   to: "nestor.ramos.lxxx@gmail.com"
    // })

  });

  test('should send email with attachments', async () => {

    await emailService.sendEmailWithFileSystemLogs('nestor.ramos.lxxx@gmail.com');

    expect(mockSendMail).toHaveBeenCalledWith({});
    
  });

});