class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_pemitted_parameters, if: :devise_controller?

  protected

  def configure_pemitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end
