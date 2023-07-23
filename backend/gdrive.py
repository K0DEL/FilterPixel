from __future__ import print_function

import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
# from googleapiclient.http import MediaIoBaseDownload

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive']


def getGoogleImages() -> list:
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('drive', 'v3', credentials=creds)
        folderId = service.files().list(q = "mimeType = 'application/vnd.google-apps.folder' and name = 'FilterPixel'", pageSize=10, fields="nextPageToken, files(id, name)").execute()
        folderIdResult = folderId.get('files', [])
        id = folderIdResult[0].get('id')
        results = service.files().list(q = "'" + id + "' in parents", pageSize=9, fields="nextPageToken, files(id, name)").execute()
        items = results.get('files', [])

        imageURLs = []
        if not items:
            print('No files found.')
            return imageURLs
        print('Files:')
        for item in items:
            print(u'{0} (https://drive.google.com/uc?export=view&id={1})'.format(item['name'], item['id']))
            imageURLs.append(u'https://drive.google.com/uc?export=view&id={0}'.format(item['id']))
            # request = service.files().get_media(fileId=item['id'])
            # file = io.BytesIO()
            # downloader = MediaIoBaseDownload(file, request)
            # done = False
            # while done is False:
            #     status, done = downloader.next_chunk()
            #     print(F'Download {int(status.progress() * 100)}.')
            
            # print(file.name)
            # file.seek(0)
            # with open(os.path.join("./GoogleImages", item['name']), "wb") as f:
            #     f.write(file.read())
            #     f.close()
        
        return imageURLs[0:6]
            
    except HttpError as error:
        # TODO(developer) - Handle errors from drive API.
        print(f'An error occurred: {error}')


# if __name__ == '__main__':
#     getGoogleImages()