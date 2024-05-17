def generate_calendar_url(event):
    # Здесь event - это объект или словарь с информацией о мероприятии (название, дата, время, место и т. д.)
    # Например:
    # event = {
    #     "name": "Событие",
    #     "date": "2024-05-20",
    #     "time": "10:00",
    #     "location": "Место проведения",
    #     "description": "Описание события"
    # }

    # Формируем URL-адрес с информацией о мероприятии
    url = f"webcal://add.event.yahoo.co.jp/calendar?ST={event['date']}T{event['time']}&TITLE={event['name']}&DESC={event['description']}&in_loc={event['location']}"

    return url


# Пример использования
event_info = {
    "name": "Важное событие",
    "date": "2024-05-20",
    "time": "10:00",
    "location": "Офис",
    "description": "Это очень важное событие, не пропустите!"
}

calendar_url = generate_calendar_url(event_info)
print(calendar_url)
