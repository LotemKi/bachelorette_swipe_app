FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 1. copy csproj first (best practice + faster restore)
COPY backend-dotnet.csproj ./
RUN dotnet restore

# 2. copy everything
COPY . .

# 3. publish explicitly
RUN dotnet publish backend-dotnet.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 10000

ENTRYPOINT ["dotnet", "backend-dotnet.dll"]