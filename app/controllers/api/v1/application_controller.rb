class Api::V1::ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :set_headers

  rescue_from ActionController::ParameterMissing do |exception|
    logger.warn exception.message
    render_errors({:param => exception.message}, :bad_request)
  end

  rescue_from ActionController::UnpermittedParameters do |exception|
    logger.warn exception.message
    render_errors({:param => exception.message}, :bad_request)
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    logger.warn exception.message

    key = exception.message
    if key.include?("'id'=")
      key = exception.message[/Couldn't find (.*?) with/,1].singularize
    end
    if key.include?("'id':")
      key = exception.message[/find all (.*?) with/,1].singularize
    end

    render_errors({key.downcase => "Not found"}, :not_found)
  end

  def invalid_route
    head :no_content
  end

  protected

  def render_success(object = {}, status = :ok, options = {})
    render options.merge({:json => object, :status => status})
  end

  def render_errors(object, status = :bad_request, options = {})
    render options.merge({:json => {:errors => object}, :status => status})
  end

  private

  def set_headers
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Allow-Credentials"] = "true"
  end

  def default_serializer_options
    { root: false }
  end
end
