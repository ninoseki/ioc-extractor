# frozen_string_literal: true

require "http"

url = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt"

res = HTTP.get(url)
lines = res.body.to_s.lines
p lines.reject { |line| line.start_with? "#" }.map(&:chomp).map(&:downcase)
