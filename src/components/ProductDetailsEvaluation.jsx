import React from 'react';
import Assessment from './Assessment';

class ProductDetailsEvaluation extends React.Component {
  constructor() {
    super();

    this.handleEvaluationChange = this.handleEvaluationChange.bind(this);
    this.saveEvaluation = this.saveEvaluation.bind(this);

    this.state = {
      email: '',
      note: 0,
      message: '',
      assessments: [],
    };
  }

  saveEvaluation() {
    const { email, note, message, assessments } = this.state;
    const comment = { email, note, message };
    this.setState({
      email: '',
      note: 0,
      message: '',
      assessments: assessments.concat([comment]),
    });
  }

  handleEvaluationChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, note, message, assessments } = this.state;
    return (
      <div className='product-evaluation'>
        <h3 className='evaluation-title'>Avaliações</h3>
        <div className='avaliabe-form-container'>
          <div className='evaluation-fields'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={this.handleEvaluationChange}
              placeholder='Email'
              className="input-email"
            />
            <label htmlFor='note'>
              Nota
              <input
                type='number'
                name='note'
                value={note}
                onChange={this.handleEvaluationChange}
                min={0}
                max={5}
                id="note"
              />
            </label>
          </div>
          <div className='evaluation-fields'>
            <textarea
              name='message'
              placeholder='Mensagem (opcional)'
              value={message}
              onChange={this.handleEvaluationChange}
              data-testid='product-detail-evaluation'
            />
          </div>
          <button
            type='button'
            onClick={this.saveEvaluation}
            className='avaliable-button'>
            Avaliar
          </button>
        </div>
        <div>
          {assessments.map(item => (
            <Assessment key={item.email} props={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductDetailsEvaluation;
