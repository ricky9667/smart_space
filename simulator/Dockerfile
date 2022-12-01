FROM python:alpine

RUN addgroup -S -g 1001 app && \
    adduser -S -D -h /app -u 1001 -G app app

# Creating environment
USER app

# Creating working directory
WORKDIR /app/
RUN chown -R app.app /app/

# Copying files
COPY --chown=app:app . /app/

# Update environment
ENV PATH="${PATH}:/app/.local/bin"

# Installing dependencies
RUN pip install pipenv --no-cache-dir --user --upgrade && \
    pipenv install --deploy --ignore-pipfile

# Run the simulator.
CMD ["pipenv", "run", "python", "-m", "simulator"]
