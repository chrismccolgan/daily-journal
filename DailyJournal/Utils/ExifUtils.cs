﻿using System.IO;

namespace DailyJournal.Utils
{
    public static class ExifRemover
    {
        /// <summary>
        /// Removes EXIF metadata from jpeg image uploads
        /// </summary>
        public static Stream PatchAwayExif(Stream inStream, Stream outStream)
        {
            inStream.Position = 0;
            byte[] jpegHeader = new byte[2];
            jpegHeader[0] = (byte)inStream.ReadByte();
            jpegHeader[1] = (byte)inStream.ReadByte();
            if (jpegHeader[0] == 0xff && jpegHeader[1] == 0xd8) //check if it's a jpeg file
            {
                SkipAppHeaderSection(inStream);
                outStream.WriteByte(0xff);
                outStream.WriteByte(0xd8);
                int readCount;
                byte[] readBuffer = new byte[4096];
                while ((readCount = inStream.Read(readBuffer, 0, readBuffer.Length)) > 0)
                {
                    outStream.Write(readBuffer, 0, readCount);
                }
            }
            else
            {
                inStream.Position = 0;
                inStream.CopyTo(outStream);
            }
            outStream.Position = 0;
            return outStream;
        }

        private static void SkipAppHeaderSection(Stream inStream)
        {
            byte[] header = new byte[2];
            header[0] = (byte)inStream.ReadByte();
            header[1] = (byte)inStream.ReadByte();
            while (header[0] == 0xff && (header[1] >= 0xe0 && header[1] <= 0xef))
            {
                int exifLength = inStream.ReadByte();
                exifLength <<= 8;
                exifLength |= inStream.ReadByte();
                for (int i = 0; i < exifLength - 2; i++)
                {
                    inStream.ReadByte();
                }
                header[0] = (byte)inStream.ReadByte();
                header[1] = (byte)inStream.ReadByte();
            }
            inStream.Position -= 2; //skip back two bytes
        }
    }
}