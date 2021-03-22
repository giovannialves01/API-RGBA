require 'sass'

module Sass::Script::Functions
    def datetime()
        return Sass::Script::String.new( Time.now.strftime( "%F" ) )
    end
end