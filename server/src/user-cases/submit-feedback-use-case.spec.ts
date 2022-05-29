import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
)

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example of comment',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with no type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example of comment',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with no comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example of comment',
      screenshot: 'example.jpg'
    })).rejects.toThrow();
  });

});