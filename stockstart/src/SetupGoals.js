import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './SetupGoals.css';

function SetupGoals() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    investmentGoal: '',
    riskTolerance: '',
    timeHorizon: '',
    preferredIndustries: [],
    investmentAmount: ''
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data: user, error } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (error || !user) {
          console.error('User verification failed:', error);
          navigate('/login');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error verifying user:', error);
        navigate('/login');
      }
    };

    verifyUser();
  }, [userId, navigate]);

  const goals = [
    {
      value: 'long-term-growth',
      label: 'Long-term Growth',
      description: 'Focus on stocks that aim for long-term capital appreciation or portfolio growth over multiple years.'
    },
    {
      value: 'regular-income',
      label: 'Regular Income',
      description: 'Emphasis on dividend-paying stocks for steady income streams.'
    },
    {
      value: 'short-term-trading',
      label: 'Short-term Trading',
      description: 'Active trading for shorter holding periods and quick returns. Often seen as more risky.'
    },
    {
      value: 'retirement',
      label: 'Retirement Planning',
      description: 'Building a portfolio for retirement with a combination of growth and, more importantly, stability.'
    }
  ];

  const riskLevels = [
    {
      value: 'conservative',
      label: 'Conservative',
      description: 'Lower risk investments with stable but lower returns.'
    },
    {
      value: 'moderate',
      label: 'Moderate',
      description: 'Balanced approach with medium risk and moderate returns.'
    },
    {
      value: 'aggressive',
      label: 'Aggressive',
      description: 'Higher risk investments with potential for higher rewards and returns.'
    }
  ];

  const timeframes = [
    {
      value: 'short',
      label: 'Short-term (< 1 year)',
      description: 'For goals you want to achieve within the next year.'
    },
    {
      value: 'medium',
      label: 'Medium-term (1-5 years)',
      description: 'For mid-range financial objectives over the next few years.'
    },
    {
      value: 'long',
      label: 'Long-term (5+ years)',
      description: 'For long-term wealth building and major life goals.'
    }
  ];

  const industries = [
    {
      value: 'tech',
      label: 'Technology',
      description: 'Software, hardware, and IT companies.'
    },
    {
      value: 'healthcare',
      label: 'Healthcare',
      description: 'Medical devices, healthcare services, and pharmaceuticals companies.'
    },
    {
      value: 'finance',
      label: 'Finance',
      description: 'Financial services, insurance companies, and public banks.'
    },
    {
      value: 'consumer',
      label: 'Consumer Goods',
      description: 'Retail, food, and consumer products companies.'
    },
    {
      value: 'energy',
      label: 'Energy',
      description: 'Oil, gas, and renewable energy companies.'
    },
    {
      value: 'real-estate',
      label: 'Real Estate',
      description: 'Property development and Real Estate Investment Trusts.'
    }
  ];

  const amounts = [
    {
      value: 'small',
      label: '$100 - $1,000',
      description: 'Start small and grow your portfolio.'
    },
    {
      value: 'medium',
      label: '$1,000 - $5,000',
      description: 'Build a diversified portfolio.'
    },
    {
      value: 'large',
      label: '$5,000 - $10,000',
      description: 'Substantial investment capacity.'
    },
    {
      value: 'xlarge',
      label: '$10,000+',
      description: 'Maximum investment flexibility.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('user_preferences')
        .insert([{
          user_id: parseInt(userId, 10),
          investment_goal: formData.investmentGoal,
          risk_tolerance: formData.riskTolerance,
          time_horizon: formData.timeHorizon,
          preferred_industries: formData.preferredIndustries,
          investment_amount: formData.investmentAmount
        }]);

      if (error) throw error;
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  if (isLoading) {
    return <div className="setup-container">Loading...</div>;
  }

  return (
    <div className="setup-container">
      <div className="setup-box">
        <h1>Set Up Your Investment Profile</h1>
        <p className="setup-description">Let's personalize your experience to provide better stock suggestions</p>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="step-content fade-in">
              <h2>What's your primary investment goal?</h2>
              <div className="options-grid">
                {goals.map(goal => (
                  <div 
                    key={goal.value}
                    className={`option-card ${formData.investmentGoal === goal.value ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, investmentGoal: goal.value });
                    }}
                  >
                    <h3>{goal.label}</h3>
                    <div className="info-tooltip">{goal.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content fade-in">
              <h2>What's your risk tolerance?</h2>
              <div className="options-grid">
                {riskLevels.map(risk => (
                  <div 
                    key={risk.value}
                    className={`option-card ${formData.riskTolerance === risk.value ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, riskTolerance: risk.value });
                    }}
                  >
                    <h3>{risk.label}</h3>
                    <div className="info-tooltip">{risk.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content fade-in">
              <h2>What's your investment timeline?</h2>
              <div className="options-grid">
                {timeframes.map(time => (
                  <div 
                    key={time.value}
                    className={`option-card ${formData.timeHorizon === time.value ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, timeHorizon: time.value });
                    }}
                  >
                    <h3>{time.label}</h3>
                    <div className="info-tooltip">{time.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-content fade-in">
              <h2>Select your preferred industries</h2>
              <div className="options-grid">
                {industries.map(industry => (
                  <div 
                    key={industry.value}
                    className={`option-card ${formData.preferredIndustries.includes(industry.value) ? 'selected' : ''}`}
                    onClick={() => {
                      const updatedIndustries = formData.preferredIndustries.includes(industry.value)
                        ? formData.preferredIndustries.filter(i => i !== industry.value)
                        : [...formData.preferredIndustries, industry.value];
                      setFormData({ ...formData, preferredIndustries: updatedIndustries });
                    }}
                  >
                    <h3>{industry.label}</h3>
                    <div className="info-tooltip">{industry.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-content fade-in">
              <h2>What's your investment amount?</h2>
              <div className="options-grid">
                {amounts.map(amount => (
                  <div 
                    key={amount.value}
                    className={`option-card ${formData.investmentAmount === amount.value ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, investmentAmount: amount.value });
                    }}
                  >
                    <h3>{amount.label}</h3>
                    <div className="info-tooltip">{amount.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button 
                type="button" 
                className="back-btn"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            {currentStep < 5 ? (
              <button 
                type="button" 
                className="next-btn"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  currentStep === 4 
                    ? formData.preferredIndustries.length === 0 
                    : !formData[Object.keys(formData)[currentStep - 1]]
                }
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!formData.investmentAmount}
              >
                Complete Setup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetupGoals;